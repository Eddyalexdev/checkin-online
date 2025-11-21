import * as FileSystem from 'expo-file-system/legacy';

const apiKey = 'md_mvqHksE6pMTreijv9ZX2ETgio2Tw5GEt';
const modelId = 'd9beeffa-b2a6-4f75-9b7c-dafa7e824946';

export const sendImageToMindee = async (uri: string) => {

  // Leer archivo como base64
  const fileBase64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });

  const formData = new FormData();
  formData.append('model_id', modelId);
  formData.append('file_base64', fileBase64);

  const response = await fetch('https://api-v2.mindee.net/v2/inferences/enqueue', {
    method: 'POST',
    headers: {
      Authorization: apiKey,
    },
    body: formData,
  });

  const data = await response.json();
  return data; 
}

export const pollMindeeJob = async (pollingUrl: string) => {
  let status = '';
  let data;

  do {
    const res = await fetch(pollingUrl, {
      headers: { Authorization: apiKey },
    });

    data = await res.json();

    if (data.job) {
      status = data.job.status;
    } else if (data.inference) {
      status = 'Processed';
      break;
    } else {
      throw new Error('Respuesta inesperada de Mindee');
    }

    if (status !== 'Processed' && status !== 'Failed') {
      await new Promise(r => setTimeout(r, 2000));
    }
  } while (status !== 'Processed' && status !== 'Failed');

  if (data.inference) return data.inference.result;
  if (data.job) return data.job.result_url;

  return null;
}
