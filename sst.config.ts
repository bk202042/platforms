import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";
import*as dotenv from "dotenv";
dotenv.config();

export default {
  config(_input) {
    return {
      name: "platforms",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      if (!process.env.POSTGRES_PRISMA_URL) {
        throw new Error('process.env.POSTGRES_PRISMA_URL is not defined');
      }
      
      const postgresPrismaUrl = process.env.POSTGRES_PRISMA_URL;
      
      const site = new NextjsSite(stack, 'site', {
        environment: {
          POSTGRES_PRISMA_URL: postgresPrismaUrl,
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} as SSTConfig;
