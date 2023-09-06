var expect = require("chai").expect;
var request = require("request");
var url = "http://localhost:3000/api/cat";
let _id;
let cat = {
    title: "kitten-unique-3",
    subTitle: "kitten-unique-3",
    link: "kitten",
    path: "kitten",
    description: "kitten",
};

describe("GET Request", function () {
    it("Retrieve data from DB", function (done) {
        this.timeout(5000);

        request(url, function (_, res) {
            let body = JSON.parse(res["body"]);

            expect(body.data).to.be.a("array");
            expect(body.data).not.to.be.empty;
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
});

describe("Insert new cat", function () {
    it("insert a cat to database", function (done) {
        this.timeout(5000);

        request.post({ url: url, form: cat }, function (_, res) {
            let body = JSON.parse(res.body);
            expect(body.message).to.contain("added");
            expect(res.statusCode).to.equal(201);
            _id = body.data.insertedId;
            done();
        });
    });
});

describe("Delete new cat", function () {
    it("Delete a cat from database", function (done) {
        this.timeout(5000);

        request.delete(`${url}/${_id}`, function (_, res) {
            let body = JSON.parse(res.body);
            expect(body.message).to.contain("deleted");
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
});
