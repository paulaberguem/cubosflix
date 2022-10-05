# Cubos Flix

Essa aplicação foi desenvolvida a partir de um desafio da Cubos Academy.
É uma aplicação para um serviço de streaming, onde os dados do website são requisitados da [seguinte API](https://tmdb-proxy.cubos-academy.workers.dev)

O website foi construído a partir de um design e inclui:

#### Visualização de filmes

Assim que inicia a aplicação, a listagem de filmes é preenchida com as informações do [seguinte endpoint](https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false)

A estrutura HTML criada para cada filme é construída dinamicamente pela DOM.

#### Paginação de filmes

O website mostra no máximo 5 filmes por vez. E ao voltar ou avançar uma página, os filmes em tela serão atualizados corretamente.

#### Busca de filmes

O usuário pode fazer busca de filmes através do input de pesquisa. A busca é feita [no endpoint](https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false)

#### "Filme do dia"

O filme do dia é preenchido com as informações do [endpoint geral](https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR) e do [endpoint de videos](https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR);

#### Modal de filme

#### Mudança de tema

alternância de temas "light" e "dark".

###### tags: `front-end` `HTML` `DOM` `CSS`
# cubosflix
