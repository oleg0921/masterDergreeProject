import { google } from 'googleapis';

function GoogleCloudStorageComponent() {
    const authClient = new google.auth.GoogleAuth({
        keyFile: './googleCloud/tough-medley-434917-u2-59bab338f73a.json',
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    const storage = google.storage('v1');


    async function authorize() {
        try {
            const client = await authClient.getClient();
            google.options({ auth: client });
            console.log('Авторизация прошла успешно.');
        } catch (error) {
            console.error('Ошибка авторизации:', error);
        }
    }


    async function getFile(bucketName, folderName, fileName) {
        try {
            const filePath = `${folderName}/${fileName}`;
            const response = await storage.objects.get({
                bucket: bucketName,
                object: filePath,
                alt: 'media',
            });
            console.log(`Файл ${fileName} успешно получен:`);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении файла ${fileName}:`, error);
        }
    }

    return { authorize, getFile };
}

export default GoogleCloudStorageComponent;