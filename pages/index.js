import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSideBar(props) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${props.githubUser}.png`}
        alt="foto de perfil"
        style={{ borderRadius: '8px' }}
      />
      <hr />
      <p>
        <a
          className="boxLink"
          href={`https://github.com/${props.githubUser}.png`}
        >
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {/* {seguidores.map(itemAtual => {
          return (
            <li key={itemAtual}>
              <a href={`/users/${itemAtual}`}>
                <img
                  src={`https://github.com/${itemAtual}.png`}
                  alt="foto de perfil"
                />
                <span>{itemAtual}</span>
              </a>
            </li>
          )
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([])
  const githubUser = 'moreiraandrep'
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'marcobrunodev',
    'gajalves',
    'rafaballerini',
  ]

  const [seguidores, setSeguidores] = React.useState([])
  React.useEffect(function () {
    fetch(`https://api.github.com/users/peas/followers`)
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json()
      })
      .then(function (respostaCompleta) {
        setSeguidores(respostaCompleta)
      })

    //API DatoCMS -> GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        Authorization: '3580d50e490cc6fbbec9226de964ba',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `query {
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
          }
        }`,
      }),
    })
      .then(response => response.json())
      .then(respostaCompleta => {
        const comunidadesDatoCms = respostaCompleta.data.allCommunities
        setComunidades(comunidadesDatoCms)
        console.log(comunidadesDatoCms)
      })
  }, [])

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form
              onSubmit={function handleCreateCommunity(e) {
                e.preventDefault()
                const dadosForm = new FormData(e.target)

                // id: new Date().toISOString(),
                const comunidade = {
                  title: dadosForm.get('title'),
                  imageUrl: dadosForm.get('image'),
                  creatorSlug: githubUser,
                }

                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade),
                }).then(async response => {
                  const dados = await response.json()
                  console.log(dados.registroCriado)
                  const comunidade = dados.registroCriado
                  const novaComunidade = [...comunidades, comunidade]
                  setComunidades(novaComunidade)
                })
              }}
            >
              <div>
                <input
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  type="url"
                  placeholder="Coloque uma URL para usarmos de capa"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div
          className="profileRelationsArea"
          style={{ gridArea: 'profileRelationsArea' }}
        >
          <ProfileRelationsBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map(itemAtual => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/comunidades/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} alt="capa da comunidade" />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map(itemAtual => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img
                        src={`https://github.com/${itemAtual}.png`}
                        alt="foto de perfil"
                      />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
