import { google } from "googleapis";

//const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default class ProductService {
  static async getTable() {
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
    const sheets = google.sheets({ version: 'v4', auth });

    const range = `sorted`;// !A2:Z1000 // ${alphabet[primary - 1]}${rows + 3}

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range
    });

    if (response.data.values != undefined) {
      const data = response.data.values;

      return {
        people: data.slice(3),
        titles: data[1]
      }
    }

    return null;
  }

  static async getProduct(id) {
    // if (this.data == null) {
    //   this.data = await this.getTable();
    // }

    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
    const sheets = google.sheets({ version: 'v4', auth });

    const position = Number.parseInt(id) + 4;
    const range = `sorted!A${position}:Z${position}`;// !A2:Z1000 // ${alphabet[primary - 1]}${rows + 3}

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range
    });

    if (response.data.values != undefined) {
      return response.data.values[0]
    }

    return null;
    // return this.data.people[id];
  }
}