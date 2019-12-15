interface IMail {
  From: any;
  To: any[];
  Subject: string;
  TextPart: string;
  HTMLPart: string;
}

export { IMail };
