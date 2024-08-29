import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return new Response(JSON.stringify({ message: 'Email and password are required' }), { status: 400 });
    }

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return new Response(JSON.stringify({ message: 'Email already in use' }), { status: 400 });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return new Response(JSON.stringify(newUser), { status: 201 });
    } catch (error) {
        console.error('Error in register API:', error);
        return new Response(JSON.stringify({ message: 'User creation failed', error: error.message }), { status: 500 });
    }
}
