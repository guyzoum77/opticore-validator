export function dataURIRule(value: any): boolean {
    const dataUriRegex = /^\s*data:([a-z]+\/[a-z0-9\-+.]+(;[a-z\-]+=[a-z0-9\-]+)?)?(;base64Rule)?,[a-z0-9!$&',()*+,;=._~:@\/?%\s-]*\s*$/i;
    return dataUriRegex.test(value);
  }
  