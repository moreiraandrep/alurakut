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

export default function Home() {
  const [comunidades, setComunidades] = React.useState([
    {
      id: '45658a787as8d7as8d7a4sd4',
      title: 'Eu odeio acordar cedo!',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    },
  ])
  const githubUser = 'moreiraandrep'
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'marcobrunodev',
    'gajalves',
    'rafaballerini',
  ]

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

                const comunidade = {
                  id: new Date().toISOString(),
                  title: dadosForm.get('title'),
                  image: dadosForm.get('image,'),
                }

                const novaComunidade = [...comunidades, comunidade]
                setComunidades(novaComunidade)
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
          <ProfileRelationsBoxWrapper>
            <ul>
              {comunidades.map(itemAtual => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} alt="capa da comunidade" />
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

          {/* <Box>
            <h2 className="smallTitle">Comunidades</h2>
          </Box> */}
        </div>
      </MainGrid>
    </>
  )
}
