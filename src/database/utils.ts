import fs from "fs";

export function saveToDatabase(DB: any) {
  fs.writeFileSync("./src/database/db.json", JSON.stringify(DB, null, 2), {
    encoding: "utf-8",
  });
}
