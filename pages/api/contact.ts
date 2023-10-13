import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

type MessageData = {
  email: string;
  name: string;
  message: string;
  id?: ObjectId;
};

type ResponseData = {
  message: string;
  data?: MessageData;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }
    const newMessage: MessageData = {
      email,
      name,
      message,
    };

    let client: MongoClient | undefined;

    const connetionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.bilewxg.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`;

    try {
      client = await MongoClient.connect(connetionString);
    } catch (error: any) {
      res.status(500).json({ message: 'Could not connect to database.' });
      return;
    }
    const db = client.db(process.env.mongodb_database);

    let result;
    try {
      result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error: any) {
      res.status(500).json({
        message: 'Could not insert message to database.',
      });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: 'Successfully stored message!', data: newMessage });
  }
}
