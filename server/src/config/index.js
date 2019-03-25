export default {
  name: 'fittrack',
  port: 3000,
  db: {
    // url: 'mysql://user:pass@example.com:9821/db_name',
     url: 'mysql://swarnak1:thl710@127.0.0.1:3306/swarnak1_db'
	//url : 'sqlite://db.sqlite'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'EazKpubuRwzs752o5cfE5cE7YaNQrGkmkvmsdD5A',
  },
}