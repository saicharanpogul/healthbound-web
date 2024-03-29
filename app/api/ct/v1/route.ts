import fs from "fs";
import _ from "lodash";
import path from "path";
import sharp from "sharp";

path.resolve(process.cwd(), "fonts", "fonts.conf");
path.resolve(process.cwd(), "fonts", "Poppins-Black.ttf");
path.resolve(process.cwd(), "fonts", "Poppins-BlackItalic.ttf");
path.resolve(process.cwd(), "fonts", "Poppins-Bold.ttf");
path.resolve(process.cwd(), "fonts", "Poppins-BoldItalic.ttf");
path.resolve(process.cwd(), "fonts", "Poppins-ExtraBold.ttf");
path.resolve(process.cwd(), "fonts", "Poppins-ExtraBoldItalic.ttf");
path.resolve(process.cwd(), "fonts", "Poppins-Italic.ttf");
path.resolve(process.cwd(), "fonts", "Poppins-Light.ttf");
path.resolve(process.cwd(), "fonts", "Poppins-LightItalic.ttf");
path.resolve(process.cwd(), "fonts", "Poppins-Medium.ttf");
path.resolve(process.cwd(), "fonts", "Poppins-MediumItalic.ttf");
path.resolve(process.cwd(), "fonts", "Poppins-Regular.ttf");
path.resolve(process.cwd(), "fonts", "Poppins-SemiBold.ttf");
path.resolve(process.cwd(), "fonts", "Poppins-SemiBoldItalic.ttf");
path.resolve(process.cwd(), "fonts", "Poppins-Thin.ttf");
path.resolve(process.cwd(), "fonts", "Poppins-ThinItalic.ttf");
path.resolve(process.cwd(), "fonts", "RammettoOne-Regular.ttf");

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
  const { data, address, datetime, type } = Object.fromEntries(
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

  const filePath = path.join(process.cwd(), "public", "CT.svg");
  const image = fs.readFileSync(filePath, "utf-8");

  let svg = image;

  svg = svg.replace("{address}", address);
  svg = svg.replace("{data}", data);
  svg = svg.replace("{date}", formattedDate);

  if (type === "svg") {
    return new Response(svg, {
      headers: { "Content-Type": "image/svg+xml" },
    });
  } else {
    const png = await sharp(Buffer.from(svg)).png().toBuffer();
    return new Response(png, {
      headers: { "Content-Type": "image/png" },
    });
  }
}
