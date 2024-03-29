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
  const { soul, address, type } = Object.fromEntries(searchParams.entries());

  await paramMissing(soul as string, Object.keys({ soul }).pop()!.toString());
  await paramMissing(
    address as string,
    Object.keys({ address }).pop()!.toString()
  );

  const filePath = path.join(process.cwd(), "public", "HBT.svg");
  const image = fs.readFileSync(filePath, "utf-8");

  let svg = image;

  svg = svg.replace("{address}", address);
  svg = svg.replace("{soul}", soul);

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
