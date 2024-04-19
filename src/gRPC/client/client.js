const messages = require('./node/static_codegen/account_pb');
const accessTypes = require('./node/static_codegen/types/access.types_pb')
const services = require('./node/static_codegen/account_grpc_pb');

const grpc = require('@grpc/grpc-js');

function main() {
    const client = new services.AccountClient("localhost:3000", grpc.credentials.createInsecure());

    const request = new messages.AccountRequest();
    const access = new accessTypes.Access();
    access.setDomain("laboratorysalestelegramprofil1.amocrm.ru");
    access.setToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY3M2IzMWJhNTgzMzgzOTQzMmNkMjAwNWIwM2QxYTUyYzczMmMxZjY1MWUyYzEwYjBlNTYyNjZhMzA0NjhkMmE2OWEwNzMxNDgxMjkxMzA1In0.eyJhdWQiOiI4ODJmN2FmOS03OTE4LTQxMjUtOWNhNi04NDZiZmJjNjM5NGEiLCJqdGkiOiJmNzNiMzFiYTU4MzM4Mzk0MzJjZDIwMDViMDNkMWE1MmM3MzJjMWY2NTFlMmMxMGIwZTU2MjY2YTMwNDY4ZDJhNjlhMDczMTQ4MTI5MTMwNSIsImlhdCI6MTcxMzU0MjU3MiwibmJmIjoxNzEzNTQyNTcyLCJleHAiOjE3MTM2Mjg5NzIsInN1YiI6Ijk4MjI3NDYiLCJncmFudF90eXBlIjoiIiwiYWNjb3VudF9pZCI6MzExMzYzMDYsImJhc2VfZG9tYWluIjoiYW1vY3JtLnJ1IiwidmVyc2lvbiI6Miwic2NvcGVzIjpbInB1c2hfbm90aWZpY2F0aW9ucyIsImNybSIsIm5vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjpudWxsfQ.pXaKNn_Gb5F46A0IGxN0kXMyzJP4lT4cngVPZ54q8KEYQK9lWeSh5kWCZomErf-Unh0pEvIutE8Z-fvF2C_Ix5d3Ld9OtZ05Fl2HLc_Es_EqVUzm6PnwbWO4usRXGNDQXMTlW-_0hT7sYmKIhb-_oliwP8a-nv6Idrp5IBW07sLg_W8xOP5i0Ay09qxU-m-xvw3nT3tbCKwlOCDpL3q3gdT4GPnHchHCsfOuRU51ja5nBR4qnjHmOazIT9OlDH3u-N2Tc1Vc4n2fwpFT1EH75EltQiKFqBA1RcGZFG-wmh9KdfOkPlTx9CXPjqb7Dpd8JJb_gnEcGZ9jO3dtS6XiJQ");

    request.setAccess(access);

    client.getAccountParams(request, (err, response) => {
        if (err) {
            console.log(err)
            return
        }

        console.log(response)
    })
}

main()