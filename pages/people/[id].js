import { google } from "googleapis";

export async function getServerSideProps({ query }) {
  const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
  const sheets = google.sheets({ version: 'v4', auth });

  const { id } = query;
  const position = Number.parseInt(id) + 2;
  const range = `main!A${position}:B${position}`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range
  });

  console.log(response.data.values);
  if (response.data.values != undefined) {
    const [name, age] = response.data.values[0];

    return {
      props: {
        name,
        age
      }
    }
  }

  return {
    props: {
      name: 'no',
      age: 0
    }
  }

}

export default function Person({ name, age }) {
  return (
    <div>
      <h1>Name: {name}. Age: {age}.</h1>
    </div>
  )
}