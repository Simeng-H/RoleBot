const fs = require('fs')
const parse = require('csv-parse/lib/sync');
let idToCohort = {};
let load = () => {
    let file = fs.readFileSync('./asset/F20 CS2110 Cohorts.csv', 'utf-8');
    // console.log(file);
    let rows = parse(file, { columns: false, trim: true })
    // console.log(rows)
    rows.forEach((row) => {
        let id = row[0].trim();
        if (id === "0") {
            return
        }
        let cohort = row[1]
        // console.log(`${id}: ${cohort}`)
        idToCohort[id] = cohort
        // console.log(idToCohort[id]);
    })
}

load();
// console.log(idToCohort['mtl2mr'])
module.exports = idToCohort


