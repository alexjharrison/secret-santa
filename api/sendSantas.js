import matchSantas from './matchSantas'
import questions from './questions'
import { transporter } from './env'

export default async () => {
  const santaData = await matchSantas()
  for (const user of santaData) {
    const {
      name: gifter,
      email: gifterEmail,
      match: { name: giftee, email: gifteeEmail, address, answers },
    } = user

    const msg = {
      to: gifterEmail,
      from: 'alex@aharrison.xyz',
      subject: `Hi ${gifter}, your secret santa match is here`,
      html: `
    <h1>Your Match: ${giftee}</h1>
    <img style="margin: 10px 0;" src="https://secretsanta.aharrison.xyz/people/${giftee}.png"></img>
    <p>Address: ${address}</p>
    <p>Email: <a href="mailto:${gifteeEmail}">${gifteeEmail}</a></p>
    <h2>Survey</h2>
    <p style="margin-bottom:0;"><strong>${questions[0]}</strong></p> 
    <p>${answers[0]}</p> 
    <p style="margin-bottom:0;"><strong>${questions[1]}</strong></p> 
    <p>${answers[1]}</p> 
    <p style="margin-bottom:0;"><strong>${questions[2]}</strong></p> 
    <p>${answers[2]}</p> 
    <p style="margin-bottom:0;"><strong>${questions[3]}</strong></p> 
    <p>${answers[3]}</p> 
    <p style="margin-bottom:0;"><strong>${questions[4]}</strong></p> 
    <p>${answers[4]}</p> 
    <p style="margin-bottom:0;"><strong>${questions[5]}</strong></p> 
    <p>${answers[5] && answers[5].join(', ')}</p> 
    `,
    }

    transporter
      .sendMail(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch(error => {
        console.error(error)
      })
  }

  return santaData
}
