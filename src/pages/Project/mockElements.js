import React from 'react'

export default [
  {
    id: '1',
    type: 'question',
    data: {
      question: 'Is it a question or not?',
    },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'question',
    data: {
      question: 'Is it a second question or not?',
    },
    position: { x: 50, y: 50 },
  },
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    label: 'question is related to this question',
  },
]
