import { createBucketClient } from "@cosmicjs/sdk";

// Authenticate
const cosmic = createBucketClient({
  bucketSlug: "my-blog-production",
  readKey: "zdLWHVKx975AAjPTn1N18EOhXCdzL7FTBHAn7yHFdZckH5Qsky",
  writeKey: "tB5WENXkys6SfLMhWO6M7vL2NSsYdGoDvG761AfNAT2wy6y5sN",
});

export default cosmic;
