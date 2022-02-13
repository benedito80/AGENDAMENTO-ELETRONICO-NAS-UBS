## AGENDAMENTO ELETRÔNICO

- Olá, DEV’s, é com imenso prazer que venho compartilhar um projeto pessoal desenvolvido em período de faculdade.

- O sistema é destinado ao agendamento de vacinas e outros procedimentos dentro da Rede Municipal de Saúde, sendo mais especifico, dentro das famosas Unidades Básica de Saúde (UBS).

- A ideia veio de um colega que me propôs a construir uma página web para agendamento da vacina covid 19, mas fui fazendo, fazendo... e pensei vou tentar abraçar qualquer tipo de procedimento dentro das UBS, claro que era o sistema apenas para praticar o conhecimento já adquirido e como funcionário da área entendia bem a regra do negócio que me possibilitou a criação do mesmo, mas apesar disso tive que reconstruir a base de dados muitas vezes, pois quando chegava lá no frontend via que sempre faltava algum dado e o erro estava na base de dados, sem dúvida esse é o gargalo de toda boa aplicação, mas no final consegui implementar algo que aparentemente está próximo da realidade.

- O projeto apresenta uma grande dificuldade em entendimento de suas funções e serviços em motivo do tamanho em que ficaram. Pois no período de criação eu queria ver o mesmo funcionando, sendo assim padrões e documentação ficaram para trás, rsrsr!

- Logo, adianto que o objetivo do material é compartilhar o resultado final, pois o reaproveitamento do código pode se tornar um tanto dificultoso, mas nada impossível.

# OBSERVAÇÕES

- Ao baixar o sistema: "npm i" em ambos diretórios, ou seja, no "backend" e "frontend" e na sequencia "npm start" para rodar ambos projetos em seu ambiente.

- Para utilizar o sistema um usuário admin deverá ser cadastrado que poderá ser feito pela sua respectiva interface, logo depois desse cadastro algumas modificações por segurança deverão ser realizadas, pois não queremos cadastrar os novos usuários no sistema todos como admin, as dicas está dentro do próprio código, entre lá e veja com mais detalhes, lembrando que modificações tanto no back e front deverão ser feitas, mas o passo a passo está lá...

- Um usuário padrão também deve ser criado para os usuários comuns utilizarem o sistema sendo esse: email: 'usuariopadrao@hotmail.com'; password: 'padrao@hot'; perfil: 'user'. Sendo possível alterar esses dados em: "vacina-form.component.ts". O não cadastramento deste usuário a página dará um erro quando o usuário tentar agendar um atendimento em uma ubs qualquer.

- Lembrando... para o projeto funcionar em sua máquina seu ambiente deve estar configurado adequadamente, ou seja, ter o node, mongo, ide tudo instalado e funcionando de forma correta, ambos projetos rodaram em localhost: front porta: 5300 e back na porta: 3002

- Edite o arquivo chamado ".env" na raiz do diretório “backend” com a seguinte propriedade e valor: ( JWT_SECRET = ?????? ). Ou seja, defina uma valor do conhecimento apenas de sua API, a ediçao é para a segurança do seu codigo. 


- Informações do funcionamento de todo o sistema: https://drive.google.com/file/d/1gCC-fgKyHqk3bwEtReJ6Cc4mzJ3HzLT-/view?usp=sharing


Abraços!!!

