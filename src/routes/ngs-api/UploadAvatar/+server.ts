export const nope="nah"
/*import { BlobServiceClient } from "@azure/storage-blob";

const blobSasUrl = "nope"

// Create a new BlobServiceClient
const blobServiceClient = new BlobServiceClient(blobSasUrl);

// Create a unique name for the container by 
// appending the current time to the file name
const containerName = "nope";

// Get a container client from the BlobServiceClient
const containerClient = blobServiceClient.getContainerClient(containerName);

export async function POST({ request }) { 

    try {
        const data = await request.formData();
        const player = data.get("player");
        const fileBlob = data.get("file") as File;
        const file = await fileBlob.arrayBuffer();
        console.log(file)
        console.log("Uploading files...");
        const promises = [];

        const blockBlobClient = containerClient.getBlockBlobClient('userAvatars/' + player + '.jpg');

        promises.push(blockBlobClient.uploadData(file,{ blobHTTPHeaders: {blobContentType: "image/jpg"}}));

        await Promise.all(promises);
        console.log("Done.");
        return 'done'

    }
    catch (error) {
            console.log(error.message);
            return 'error'
    }
}*/