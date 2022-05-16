export async function handler(event) {
  
  // allowed domains (@retrorabbit.co.za & @tuks.co.za [for testing])
  const ald = process.env.DOMAINALLOWLIST.split(',').map(d => d.trim());

  const { email } = event.request.userAttributes;
  const domain = email.substring(email.indexOf('@') + 1);

  if (!ald.includes(domain)) {
    throw new Error(`Invalid email domain: ${domain}`);
  }

  return event;
}
