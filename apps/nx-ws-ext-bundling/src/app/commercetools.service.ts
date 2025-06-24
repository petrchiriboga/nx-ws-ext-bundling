import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

@Injectable()
export class CommercetoolsService {
  private apiRoot;

  constructor(private readonly configService: ConfigService) {
    const projectKey = this.configService.get<string>('COMMERCETOOLS_PROJECT_KEY');
    const clientId = this.configService.get<string>('COMMERCETOOLS_CLIENT_ID');
    const clientSecret = this.configService.get<string>('COMMERCETOOLS_CLIENT_SECRET');
    const scopes = this.configService.get<string>('COMMERCETOOLS_SCOPES');
    

    const client = new ClientBuilder()
      .withProjectKey(projectKey || '')
      .withClientCredentialsFlow({
        host: this.configService.get<string>('COMMERCETOOLS_AUTH_HOST') || 'https://auth.australia-southeast1.gcp.commercetools.com',
        projectKey: projectKey || '',
        credentials: {
          clientId: clientId || '',
          clientSecret: clientSecret || '',
        },
        scopes: scopes?.split(',') || [`manage_project:${projectKey}`],
      })
      .withHttpMiddleware({
        host: this.configService.get<string>('COMMERCETOOLS_API_HOST') || 'https://api.australia-southeast1.gcp.commercetools.com',
      })
      .build();

    this.apiRoot = createApiBuilderFromCtpClient(client);
  }

  async getCustomers(limit = 10) {
    try {
      console.log('Attempting to fetch customers with project key:', this.configService.get<string>('COMMERCETOOLS_PROJECT_KEY'));
      
      const response = await this.apiRoot
        .withProjectKey({ projectKey: this.configService.get<string>('COMMERCETOOLS_PROJECT_KEY') || '' })
        .customers()
        .get({
          queryArgs: {
            limit,
          },
        })
        .execute();

      console.log('Successfully fetched customers:', response.body.results?.length || 0, 'customers');
      return response.body.results;
    } catch (error) {
      throw new Error(`Failed to fetch customers from commercetools: ${error.message || error.name || 'Unknown error'}`);
    }
  }
}
