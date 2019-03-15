const conn = require('./mysql_connection');

const model = {
    getAll(cb){
        conn.query("SELECT * FROM Fitness_caloriesburnt", (err, data) => {
            cb(err, data);
        });
    },
    get(id, cb){
        conn.query("SELECT * FROM Fitness_caloriesburnt WHERE Id=?", id, (err, data) => {
            cb(err, data[0]);
        });
    },
    add(input, cb){
        if(input.Password.length < 8){
            cb(Error('A longer Password is Required'));
            return;
        }
        conn.query( "INSERT INTO Fitness_caloriesburnt (user_id,calories_total,date,created_at) VALUES (?)",
                    [[input.user_id, input.calories_total, input.date, new Date()]],
                    (err, data) => {
                        if(err){
                            cb(err);
                            return;
                        }
                        model.get(data.insertId, (err, data)=>{
                            cb(err, data);
                        })
                    }
        );
    }
};

module.exports = model;