"use server";

// Import necessary modules and dependencies
import { prisma } from "@/lib/prisma"; // Ensure correct alias and path
import { SignupSchemaT, signupSchema } from "@/schemas"; // Ensure correct alias and path
import bcrypt from "bcryptjs";

// Function to handle user registration
export async function register(values: SignupSchemaT) {
  // Validate incoming data using Yup schema
  const validatedValues = signupSchema.safeParse(values);

  // Check if validation was successful
  if (!validatedValues.success) {
    // Return error message for invalid fields
    return { error: "Invalid fields!" };
  }

  // Destructure validated data
  const { name, email, password } = validatedValues.data;

  // Check if user with the provided email already exists
  const checkUserExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // If user exists, return error message
  if (checkUserExists) return { error: "User already exists!" };

  // Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user in the database using Prisma
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Return success message after user registration
  return { success: "Email sent" };
}
