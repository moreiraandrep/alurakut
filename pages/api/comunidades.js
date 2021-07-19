import { SiteClient } from 'datocms-client'

export default async function createComunidade(request, response) {
  if (request.method === 'POST') {
    const TOKEN = '0ac154a05a1a84b2e4cfd9987415bc'
    const client = new SiteClient(TOKEN)

    //Importante validar os dados antes de cadastrar
    const registroCriado = await client.items.create({
      itemType: '975393',
      ...request.body,
    })

    response.json({
      dados: 'Algum dado qualquer',
      registroCriado: registroCriado,
    })
    return
  }

  response.status(404).json({
    message: 'Ainda não temos nada no GET, mas no POST tem!',
  })
}
