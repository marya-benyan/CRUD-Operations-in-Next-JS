// app/api/users/[id]/route.js
const { NextResponse } = require("next/server");
const connectDB = require("../../../lib/db"); // Adjusted to new path
const User = require("../../../lib/models/user"); // Adjusted to new path

exports.GET = async function (req, { params }) {
  await connectDB();
  const user = await User.findById(params.id);
  if (!user || user.isDeleted) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user);
};

exports.PUT = async function (req, { params }) {
  await connectDB();
  const { name, email } = await req.json();

  const user = await User.findById(params.id);
  if (!user || user.isDeleted) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  user.name = name || user.name;
  user.email = email || user.email;
  await user.save();

  return NextResponse.json(user);
};

exports.DELETE = async function (req, { params }) {
  await connectDB();
  const user = await User.findById(params.id);
  if (!user || user.isDeleted) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  user.isDeleted = true; // Soft delete
  await user.save();

  return NextResponse.json({ message: "User deleted" });
};