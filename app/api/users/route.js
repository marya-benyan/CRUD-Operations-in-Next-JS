// app/api/users/route.js
const { NextResponse } = require("next/server");
const connectDB = require("../../lib/db"); // Adjusted to new path
const User = require("../../lib/models/user"); // Adjusted to new path

exports.GET = async function () {
  await connectDB();
  const users = await User.find({ isDeleted: false });
  return NextResponse.json(users);
};

exports.POST = async function (req) {
  await connectDB();
  const { name, email } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  try {
    const user = new User({ name, email });
    await user.save();
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "User creation failed" }, { status: 500 });
  }
};