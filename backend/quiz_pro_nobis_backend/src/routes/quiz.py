import json
import os
from flask import Blueprint, jsonify, request, session
from werkzeug.security import check_password_hash, generate_password_hash

quiz_bp = Blueprint('quiz', __name__)

# Simulação de usuários (em produção, usar banco de dados)
users = {
    'admin@example.com': {
        'password': generate_password_hash('admin123'),
        'name': 'Administrador'
    },
    'user@example.com': {
        'password': generate_password_hash('user123'),
        'name': 'Usuário'
    }
}

@quiz_bp.route('/questions', methods=['GET'])
def get_questions():
    """Retorna todas as perguntas do quiz"""
    try:
        questions_path = os.path.join(os.path.dirname(__file__), '..', 'questions.json')
        with open(questions_path, 'r', encoding='utf-8') as f:
            questions = json.load(f)
        return jsonify(questions), 200
    except FileNotFoundError:
        return jsonify({'error': 'Arquivo de perguntas não encontrado'}), 404
    except json.JSONDecodeError:
        return jsonify({'error': 'Erro ao decodificar arquivo de perguntas'}), 500

@quiz_bp.route('/questions/<question_id>', methods=['GET'])
def get_question(question_id):
    """Retorna uma pergunta específica pelo ID"""
    try:
        questions_path = os.path.join(os.path.dirname(__file__), '..', 'questions.json')
        with open(questions_path, 'r', encoding='utf-8') as f:
            questions = json.load(f)
        
        question = next((q for q in questions if q['question_id'] == question_id), None)
        if question:
            return jsonify(question), 200
        else:
            return jsonify({'error': 'Pergunta não encontrada'}), 404
    except FileNotFoundError:
        return jsonify({'error': 'Arquivo de perguntas não encontrado'}), 404
    except json.JSONDecodeError:
        return jsonify({'error': 'Erro ao decodificar arquivo de perguntas'}), 500

@quiz_bp.route('/login', methods=['POST'])
def login():
    """Autentica um usuário"""
    data = request.get_json()
    
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Email e senha são obrigatórios'}), 400
    
    email = data['email']
    password = data['password']
    
    if email in users and check_password_hash(users[email]['password'], password):
        session['user_email'] = email
        session['user_name'] = users[email]['name']
        return jsonify({
            'message': 'Login realizado com sucesso',
            'user': {
                'email': email,
                'name': users[email]['name']
            }
        }), 200
    else:
        return jsonify({'error': 'Credenciais inválidas'}), 401

@quiz_bp.route('/logout', methods=['POST'])
def logout():
    """Invalida a sessão do usuário"""
    session.clear()
    return jsonify({'message': 'Logout realizado com sucesso'}), 200

@quiz_bp.route('/user', methods=['GET'])
def get_current_user():
    """Retorna informações do usuário logado"""
    if 'user_email' in session:
        return jsonify({
            'email': session['user_email'],
            'name': session['user_name']
        }), 200
    else:
        return jsonify({'error': 'Usuário não autenticado'}), 401

@quiz_bp.route('/categories', methods=['GET'])
def get_categories():
    """Retorna as categorias disponíveis no quiz"""
    try:
        questions_path = os.path.join(os.path.dirname(__file__), '..', 'questions.json')
        with open(questions_path, 'r', encoding='utf-8') as f:
            questions = json.load(f)
        
        categories = {}
        for question in questions:
            category = question['category']
            part_section = question['part_section']
            
            if category not in categories:
                categories[category] = {
                    'name': category,
                    'part_section': part_section,
                    'question_count': 0,
                    'difficulties': set()
                }
            
            categories[category]['question_count'] += 1
            categories[category]['difficulties'].add(question['difficulty'])
        
        # Converter sets para listas para serialização JSON
        for category in categories.values():
            category['difficulties'] = list(category['difficulties'])
        
        return jsonify(list(categories.values())), 200
    except FileNotFoundError:
        return jsonify({'error': 'Arquivo de perguntas não encontrado'}), 404
    except json.JSONDecodeError:
        return jsonify({'error': 'Erro ao decodificar arquivo de perguntas'}), 500

