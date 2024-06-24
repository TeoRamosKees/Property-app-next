// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
// placeholder-data.js

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const properties = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'Sunset Villa',
    reservations: [
      { clientName: 'John Doe', number: '1234567890', usedDates: ['2024-01-01', '2024-01-15', '2024-02-10'] },
      { clientName: 'Jane Smith', number: '0987654321', usedDates: ['2024-03-01', '2024-03-10'] },
    ],
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f23456789012',
    name: 'Mountain Cabin',
    reservations: [
      { clientName: 'Alice Johnson', number: '5678901234', usedDates: ['2024-03-05', '2024-03-12', '2024-03-25'] },
    ],
  },
];

module.exports = {
  users,
  properties,
};
