import fs from "fs";
import _ from "lodash";

const paramMissing = async (param: string | string[], name: string) => {
  if (!param) {
    console.log(param, name);
    return Response.json(
      {
        message: `${_.capitalize(name)} is Missing.`,
      },
      { status: 400 }
    );
  }
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const { data, address, datetime } = Object.fromEntries(
    searchParams.entries()
  );

  await paramMissing(
    datetime as string,
    Object.keys({ datetime }).pop()!.toString()
  );

  await paramMissing(data as string, Object.keys({ data }).pop()!.toString());
  await paramMissing(
    address as string,
    Object.keys({ address }).pop()!.toString()
  );

  const _date = new Date(Number(datetime));
  const formattedDate = `${_date.getDate()}/${_date.getMonth()}/${_date.getFullYear()}`;

  const filePath = "./public/HBT.svg";
  const image = fs.readFileSync(filePath, "utf-8");

  let svg = image;

  svg = svg.replace("{address}", address);
  svg = svg.replace("{data}", data);
  svg = svg.replace("{date}", formattedDate);

  return new Response(svg, {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
