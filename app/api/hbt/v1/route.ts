import { HBTBack, HBTFront } from "@/app/utils";
import _ from "lodash";

const sendFileResponse = async (
  filetype: string | string[],
  png: Buffer,
  svg: any
) => {
  if (filetype === "png") {
    return new Response(png, { headers: { "Content-Type": "image/webp" } });
  } else if (filetype === "svg") {
    return new Response(svg, { headers: { "Content-Type": "image/svg+xml" } });
  } else {
    return Response.json(
      {
        message: "Invalid filetype.",
      },
      { status: 400 }
    );
  }
};

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
  const { calories, address, datetime, filetype } = Object.fromEntries(
    searchParams.entries()
  );

  await paramMissing(
    datetime as string,
    Object.keys({ datetime }).pop()!.toString()
  );
  await paramMissing(
    filetype as string,
    Object.keys({ filetype }).pop()!.toString()
  );

  await paramMissing(
    calories as string,
    Object.keys({ calories }).pop()!.toString()
  );
  await paramMissing(
    address as string,
    Object.keys({ address }).pop()!.toString()
  );
  const { svg, png } = await HBTBack(
    String(calories),
    String(address),
    Number(datetime)
  );
  return await sendFileResponse(filetype as string, png, svg);
}
