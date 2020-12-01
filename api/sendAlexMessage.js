import { transporter } from './env'

export default async user => {
  const { id, name, address, email, answers, disincludes } = user
  const msg = {
    to: 'alexjharrison@gmail.com',
    from: 'alex@aharrison.xyz',
    subject: `${name} has submitted secret santa`,
    html: `
    <h1 style="text-align:center;">Name: ${name}</h1>
    <img style="margin: 20px;" src="https://secretsanta.aharrison.xyz/people/${name}.png"></img>
    <p>Address: ${address}</p>
    <p>Email: ${email}</p>
    <p>Disincludes: ${disincludes.join(', ')}</p>
    <p>Answers</p>
    <ul>
        ${answers.map(answer => `<li>${answer}</li>`)}
    </ul>    
    `,
  }
  transporter
    .sendMail(msg)
    .then(data => {
      console.log(data.envelope)
    })
    .catch(error => {
      console.error(error)
    })
}
