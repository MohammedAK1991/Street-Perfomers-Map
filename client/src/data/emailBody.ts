import { getEnvironmentUrl } from './utils';

export async function updateEmailBody(emailBody: string) {
  try {
    const url = getEnvironmentUrl();
    await fetch(`${url}body`, {
      method: 'POST',
      body: JSON.stringify({ text: emailBody }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log('error updating email body', error);
  }
}

export async function getEmailBody() {
  try {
    const url = getEnvironmentUrl();
    const emailBody = await fetch(`${url}body`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return emailBody.json();
  } catch (error) {
    console.log('error getting email body', error);
  }
}
