import streamlit as st
import json
import os
from datetime import datetime

def load_data(type):
    """Carrega os dados do arquivo JSON."""
    file_path = f"receitas_{type}.json"
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_data(data, file_path):
    """Salva os dados no arquivo JSON."""
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

def reset_form():
    """Reseta os campos do formulário."""
    st.session_state.titulo = ""
    st.session_state.imagem = ""
    st.session_state.preco = 0
    st.session_state.legenda = ""
    st.session_state.descricao = ""
    st.session_state.serve = 1
    st.session_state.preparo = ""
    st.session_state.tempo = 0
    st.session_state.num_ingredientes = 1

def main():
    st.title("Cadastro de Receitas")

    if 'tipo_receita' not in st.session_state:
        st.session_state.tipo_receita = "Doces"

    tipo_receita = st.radio("Tipo de Receita", ["Doces", "Salgadas"])

    if tipo_receita != st.session_state.tipo_receita:
        reset_form()
        st.session_state.tipo_receita = tipo_receita

    data = load_data(tipo_receita.lower())
    file_path = f"receitas_{tipo_receita.lower()}.json"

    # Campos para adicionar nova receita
    st.header("Nova Receita")
    titulo = st.text_input("Título", key="titulo")
    imagem = st.text_input("URL da Imagem", key="imagem")
    preco = st.number_input("Preço", min_value=0, key="preco")
    legenda = st.text_area("Legenda", key="legenda")
    descricao = st.text_area("Descrição", key="descricao")
    serve = st.number_input("Serve", min_value=1, step=1, key="serve")
    preparo = st.text_area("Preparo", key="preparo")
    tempo = st.number_input("Tempo de Preparo (minutos)", min_value=0, key="tempo")

    # Ingredientes (lista dinâmica)
    st.subheader("Ingredientes")
    ingredientes = []
    num_ingredientes = st.number_input("Número de Ingredientes", min_value=1, step=1, key="num_ingredientes")
    unidades = ["x (unidade)", "pct (pacote)", "pç (peça)", "ml (milímetros)", "g (gramas)", "a/g (à gosto)"]

    for i in range(num_ingredientes):
        st.write(f"**Ingrediente {i + 1}**")
        col1, col2, col3 = st.columns(3)

        with col2:
            unidade = st.selectbox("Unidade", unidades, key=f"unidade_{i}")
        with col3:
            nome = st.text_input("Nome", key=f"nome_{i}")

        with col1:
            qtd = st.number_input("Quantidade", value=1, key=f"qtd_{i}", disabled=("a/g" in unidade))

        ingredientes.append({
            "qtd": qtd if not "a/g" in unidade else 0,
            "und": unidade,
            "nome": nome
        })

    # Botão para adicionar receita
    if st.button("Adicionar Receita"):
        nova_receita = {
            "titulo": titulo,
            "imagem": imagem,
            "preco": preco,
            "legenda": legenda,
            "descricao": descricao,
            "serve": serve,
            "preparo": preparo,
            "tempo": tempo,
            "ingredientes": ingredientes,
            "data": datetime.today().strftime('%Y-%m-%d')
        }
        data.append(nova_receita)
        save_data(data, file_path)
        st.success("Receita adicionada com sucesso!")

if __name__ == "__main__":
    main()