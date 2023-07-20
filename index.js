const express = require("express");
const app = express();
const PaytmChecksum = require("./PaytmChecksum");
const https = require('https');
const axios = require('axios');
const { google } = require('googleapis');
const key = require('./key.json');

const currentDate = new Date();
const cDay = currentDate.getDate().toString().padStart(2, '0');
const cMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const cYear = currentDate.getFullYear();



const client = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function (err) {
  if (err) {
    console.error('2 Authentication error:', err);
    return;
  }
  console.log('Authentication successful!');
});

async function createNewSheet(spreadsheetId, sheetName) {
  const sheets = google.sheets({ version: 'v4', auth: client });

  try {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: spreadsheetId,
      resource: {
        requests: [
          {
            addSheet: {
              properties: {
                title: sheetName,
              },
            },
          },
        ],
      },
    });

    console.log(`Sheet "${sheetName}" created successfully!`);
  } catch (err) {
    // console.error('Error creating sheet:');
  }
}


const arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA','AB','AC','AD','AE','AF']
const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dev']

let newSheetName = m[currentDate.getMonth()];
const sheets = google.sheets({ version: 'v4', auth: client });
const spreadsheetId = '1eE_151S-P-moJI5WBYiePvZHVIDYlhvS_-pSFVZiWSM'; // Replace with your Google Sheet ID
createNewSheet(spreadsheetId, newSheetName);
const range = m[currentDate.getMonth()] + '!' + arr[(cDay - 1)] + '2:' + arr[(cDay - 1)] + '8'; // Specify the range where you want to write data
const values=[];

app.use(express.json());

const port = 3000;

const merchants = [{
        name: "MBC",
        id: "SEPTAT50577797445689",
        key: "bN5JC#e9qilfE%il"
    },
    {
        name: "AJ",
        id: "SEPTAT93161815258290",
        key: "nF03kaEPtVse9ai5"
    },
    {
        name: "Play9",
        id: "SEPTAT66724258236775",
        key: "w9B1tidbcSIpzqBU"
    },
    {
        name: "J Sports",
        id: "SEPTAT00707693749510",
        key: "oeURdfD87XbhspoX"
    },
    {
        name: "Ahalya",
        id: "SEPTAT36545473009252",
        key: "QEQj#83WTc3ezv1f"
    },
    {
        name: "Sumukha",
        id: "SEPTAT57751577201748",
        key: "Jtz__CVd2LyinqFH"
    },
    {
        name: "Cross Court",
        id: "SEPTAT91728952717066",
        key: "WHoStZEytIYkuw8o"
    }
    // Add more merchants here if needed
];

const intervals = [{
        fromDate: cYear + "-" + cMonth + "-" + (cDay - 1).toString().padStart(2, '0') + "T03:00:00+05:30",
        toDate: cYear + "-" + cMonth + "-" + (cDay-1).toString().padStart(2, '0') + "T05:00:00+05:30"
    },
    {
        fromDate: cYear + "-" + cMonth + "-" + (cDay - 1).toString().padStart(2, '0') + "T05:00:00+05:30",
        toDate: cYear + "-" + cMonth + "-" + (cDay - 1).toString().padStart(2, '0') + "T07:00:00+05:30"
    }, {
        fromDate: cYear + "-" + cMonth + "-" + (cDay - 1).toString().padStart(2, '0') + "T07:00:00+05:30",
        toDate: cYear + "-" + cMonth + "-" + (cDay - 1).toString().padStart(2, '0') + "T09:00:00+05:30"
    }, {
        fromDate: cYear + "-" + cMonth + "-" + (cDay - 1).toString().padStart(2, '0') + "T09:00:00+05:30",
        toDate: cYear + "-" + cMonth + "-" + (cDay - 1).toString().padStart(2, '0') + "T11:00:00+05:30"
    }, {
        fromDate: cYear + "-" + cMonth + "-" + (cDay - 1).toString().padStart(2, '0') + "T11:00:00+05:30",
        toDate: cYear + "-" + cMonth + "-" + (cDay - 1).toString().padStart(2, '0') + "T13:00:00+05:30"
    }, {
        fromDate: cYear + "-" + cMonth + "-" + (cDay - 1).toString().padStart(2, '0') + "T13:00:00+05:30",
        toDate: cYear + "-" + cMonth + "-" + (cDay - 1).toString().padStart(2, '0') + "T15:00:00+05:30"
    },{
        fromDate: cYear + "-" + cMonth + "-" + (cDay - 1).toString().padStart(2, '0') + "T15:00:00+05:30",
        toDate: cYear + "-" + cMonth + "-" + (cDay - 1).toString().padStart(2, '0') + "T17:00:00+05:30"
    }, {
        fromDate: cYear + "-" + cMonth + "-" + (cDay - 1).toString().padStart(2, '0') + "T17:00:00+05:30",
        toDate: cYear + "-" + cMonth + "-" + (cDay - 1).toString().padStart(2, '0') + "T19:00:00+05:30"
    }, {
        fromDate: cYear + "-" + cMonth + "-" + (cDay - 1).toString().padStart(2, '0') + "T19:00:00+05:30",
        toDate: cYear + "-" + cMonth + "-" + (cDay - 1).toString().padStart(2, '0') + "T21:00:00+05:30"
    }, {
        fromDate: cYear + "-" + cMonth + "-" + (cDay - 1).toString().padStart(2, '0') + "T21:00:00+05:30",
        toDate: cYear + "-" + cMonth + "-" + (cDay - 1).toString().padStart(2, '0') + "T23:00:00+05:30"
    }, {
        fromDate: cYear + "-" + cMonth + "-" + (cDay - 1).toString().padStart(2, '0') + "T23:00:00+05:30",
        toDate: cYear + "-" + cMonth + "-" + cDay.toString().padStart(2, '0') + "T01:00:00+05:30"
    }, {
        fromDate: cYear + "-" + cMonth + "-" + (cDay).toString().padStart(2, '0') + "T01:00:00+05:30",
        toDate: cYear + "-" + cMonth + "-" + cDay.toString().padStart(2, '0') + "T03:00:00+05:30"
    }
    // Add more intervals here
];


app.post("/orders", async (req, res) => {
    try {
        const merchantTotalAmounts = [];

        for (const merchant of merchants) {
            let totalAmount = 0;
            for (const interval of intervals) {
                const paytmParams = {
                    body: {
                        "mid": merchant.id,
                        "fromDate": interval.fromDate,
                        "toDate": interval.toDate,
                        "orderSearchType": "TRANSACTION",
                        "orderSearchStatus": "SUCCESS",
                        "pageNumber": 1,
                        "pageSize": 50
                    },
                    head: {
                        "signature": "",
                        "tokenType": "CHECKSUM",
                        "requestTimestamp": ""
                    }
                };

                const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), merchant.key);
                paytmParams.head.signature = checksum;

                const post_data = JSON.stringify(paytmParams);

                const options = {
                    hostname: 'securegw.paytm.in',
                    port: 443,
                    path: '/merchant-passbook/search/list/order/v2',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                const response = await new Promise((resolve, reject) => {
                    const post_req = https.request(options, (post_res) => {
                        let responseData = '';

                        post_res.on('data', (chunk) => {
                            responseData += chunk;
                        });

                        post_res.on('end', () => {
                            resolve(responseData);
                        });
                    });

                    post_req.on('error', (error) => {
                        reject(error);
                    });

                    post_req.write(post_data);
                    post_req.end();
                });

                const orders = JSON.parse(response);

                for (const order of orders.body.orders) {
                    if (order.orderSearchStatus === 'SUCCESS') {
                        totalAmount += parseFloat(order.amount);
                    }
                }
                merchantTotalAmounts.push({
                    merchantNAME: merchant.name,
                    totalAmount: totalAmount
                });
            }
        }

        res.json({
            merchantTotalAmounts
        });
    } catch (error) {
        console.error('3 Error:', error);
        res.status(500).json({
            error: 'An error occurred while processing the request'
        });
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

axios.post('http://localhost:3000/orders')
    .then(response => {
        let value = []
        console.log('Machaxi Academy wise per day total amounts of successfully paid orders:');
        let i = 1;
        for (const merchant of response.data.merchantTotalAmounts) {
            if (i % 12 == 0) {
                console.log(`Machaxi Academy Name: ${merchant.merchantNAME}  ->  Total Amount: ${merchant.totalAmount}`);
                value.push(merchant)
            }
            i++;
        }
        let resource = {
            values: value,
        };
        let val = resource.values;
        let finalVal = []
        val.forEach(value => {
            let semiFinalVal = [];
            semiFinalVal.push(value.totalAmount);
            finalVal.push(semiFinalVal)
        });
        resource['values'] = finalVal
        sheets.spreadsheets.values.update({
                spreadsheetId: spreadsheetId,
                range: range,
                valueInputOption: 'RAW',
                resource: resource,
            },
            function (err, result) {
                if (err) {
                    console.error('4 Error updating sheet:', err);
                    return;
                }
                console.log('Data successfully pushed to the sheet!');
            }
        );
    })
    .catch(error => {
        console.error('Error1:', error.message);
    });
