import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";

export const db = drizzle(process.env.DATABASE_URL!);

async function main() {
	// const user: typeof usersTable.$inferInsert = {
	//   name: "John",
	//   age: 30,
	//   email: "john@example.com",
	// };
	// const serdik: typeof serdikTable.$inferInsert = {
	//   no_blangko: "166030",
	//   link_serdik:
	//     "https://drive.google.com/file/d/1-64KurfUCBN8Yy1FvAJHe-liDfeOYSsU/view?uspdrivesdk",
	//   nsb_perbaikan: "166030",
	//   nim: "2590554950124",
	//   no_peserta: "760070067040",
	//   nama: "ELI YULIANA",
	//   tempat_lahir: "Baturaja",
	//   tanggal_lahir: new Date("1995-09-17"),
	//   no_sk_kelulusan: "21 Oktober 2025",
	//   sk_rektor: "1749/UN36/HK/2025",
	//   nik: "1601144707760000",
	//   pisn: "1036869042025210000",
	//   no_register: "10362586222335",
	//   kode_bidang_studi:
	//     "862 Teknik Produksi dan Penyiaran Program Radio dan Pertelevisian",
	//   ppg: "Dalam Jabatan",
	//   jenis_ppg: "Guru Tertentu Kemenag Periode 3_2025",
	// };
	// await db.insert(usersTable).values(user);
	// console.log("New user created!");
	// await db.insert(serdikTable).values(serdik);
	// console.log("New serdik created!");
	// const users = await db.select().from(usersTable);
	// console.log("Getting all users from the database: ", users);
	// const serdiks = await db.select().from(serdikTable);
	// console.log("Getting all serdiks from the database: ", serdiks);
}

main();
