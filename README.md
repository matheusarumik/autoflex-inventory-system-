🛠️ Autoflex Factory Control
O projeto foi desenvolvido para atender requisitos de controle de estoque, receitas de produtos e sugestões automáticas de produção.

🚀 Funcionalidades Principais
Gestão de Inventário: Cadastro e monitoramento de matérias-primas em tempo real.

Construtor de Receitas: Permite vincular múltiplas matérias-primas a um único produto de uma só vez (Bulk Insert).

Inteligência de Produção: Painel que sugere os produtos mais lucrativos para fabricação com base no saldo atual do estoque.

Execução de Produção: Baixa automática de materiais no banco de dados ao finalizar uma ordem de produção.

🛠️ Stack Tecnológica
Back-end: Java, Spring Boot, Hibernate, PostgreSQL.

Front-end: React, Axios, CSS.

Banco de Dados: PostgreSQL com persistência transacional para garantir a integridade dos dados.

🏗️ Arquitetura e Boas Práticas
Clean Code: Nomenclatura de variáveis e classes padronizadas em inglês para escalabilidade.

Transacionalidade: Uso da anotação @Transactional no Spring Boot para assegurar que a baixa de estoque ocorra de forma segura.

UX/UI: Interface amigável com troca de abas e feedback instantâneo para o usuário.
