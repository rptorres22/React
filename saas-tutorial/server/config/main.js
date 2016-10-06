module.exports = {
  // Secret key for JWT signing and encryption
  'secret': 'super secret passphrase',
  // Database connection information
  'database': 'mongodb://localhost:27017/saas-tutorial',
  // Setteing port for server
  'port': process.env.PORT || 3000
  // Configuration Mailgun API for sending transactional email
  //'mailgun_priv_key': 'mailgun private key here',
  // Configuration Mailgun domain for sending transactional email
  //'mailgun_domain': 'mailgun domain here',
  // Mailchimp API key
  //'mailchimpApiKey': 'mailchimp api key here',
  // Stripe API key'
  //'stripeApiKey': 'stripe api key goes here'
}
