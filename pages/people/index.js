import { google } from "googleapis";

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

async function getRows(sheets) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'sorted!B1'
  });

  const [count] = response.data.values[0];

  return Number.parseInt(count);
}

async function getColumns(sheets) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'sorted!D1'
  });

  const [count] = response.data.values[0];

  return Number.parseInt(count);
}

async function getTitles(sheets, range) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range
  });

  return response.data.values[0];
}

async function getPrimary(sheets) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'sorted!F1'
  });

  const [count] = response.data.values[0];

  return Number.parseInt(count);
}

export async function getServerSideProps() {
  const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
  const sheets = google.sheets({ version: 'v4', auth });

  const rows = await getRows(sheets);
  const columns = await getColumns(sheets);
  const primary = await getPrimary(sheets);
  //${alphabet[primary - 1]}
  const titles = await getTitles(sheets, `sorted!A2:${alphabet[primary - 1]}2`);

  const range = `sorted!A4:${alphabet[primary - 1]}${rows + 3}`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range
  });

  if (response.data.values != undefined) {
    const people = response.data.values;

    return {
      props: {
        people: people,
        titles: titles
      }
    }
  }

  return {
    props: {
      people: [],
      titles: []
    }
  }
}

export default function People({ people, titles }) {
  return (
    <div>
      {people.map((person, index) => {
        return (
          <p key={index}>
            {person.map((prop, index) => prop ? `${titles[index]}: ${prop}. ` : null)}
          </p>
        )
      })}
    </div >
  )
}