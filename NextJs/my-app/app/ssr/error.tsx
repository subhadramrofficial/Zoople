"use client";

import React from 'react'

function error({error}:{error:Error;}) {
  return (
    <div>
      <h1>Something went wrong 🥲</h1>
      <p>{error.message}</p>
    </div>
  )
}

export default error
