import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { Link } from 'react-router-dom'
import {z} from "zod";

const SignUpSchema=z.object({
    email:z.string().email("Enter a Valid Email"),
    password:z.string().min(6,"Password must be atleast of 6 characters"),
    name:z.string().min(3,"Name Must be atlest 3 character")
})

function SignUpPage() {
  return (
    <div>SignUpPage</div>
  )
}

export default SignUpPage