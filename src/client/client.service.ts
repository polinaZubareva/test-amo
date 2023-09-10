import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';
import { ClientDto } from 'src/dto/clientDto';
import { TOKENS } from 'src/auth/constants';

@Injectable()
export class ClientService {
  apiUrl = 'https://zubarevapolinav.amocrm.ru/api/v4/contacts';
  tokens = TOKENS;
  constructor(private http: HttpService) {}

  async getAll() {
    return await firstValueFrom(
      this.http
        .get(this.apiUrl, {
          headers: { Authorization: `Bearer ${this.tokens.accessToken}` },
        })
        .pipe(
          map((res) => {
            return res.data;
          })
        )
    );
  }

  async getOne(client: ClientDto) {
    const response = await firstValueFrom(
      this.http
        .get(
          `${this.apiUrl}?filter[name]=${client.name}`,

          {
            headers: { Authorization: `Bearer ${this.tokens.accessToken}` },
          }
        )
        .pipe(
          map((res) => {
            return { contacts: res.data?._embedded?.contacts ?? null };
          })
        )
        .pipe(
          catchError((err) => {
            throw new Error(err.message);
          })
        )
    );

    if (!response.contacts) {
      return await this.postClient(client);
    }

    const clientId = response.contacts[0].id;
    return await this.patchClient(client, clientId);
  }

  async postClient(client: ClientDto) {
    const posted = await firstValueFrom(
      this.http
        .post(
          this.apiUrl,
          [
            {},
            {
              name: client.name,
              custom_fields_values: [
                {
                  field_id: 1480639,
                  field_name: 'Телефон',
                  field_code: 'PHONE',
                  field_type: 'multitext',
                  values: [
                    {
                      value: client.phone,
                      enum_id: 1668729,
                      enum_code: 'WORK',
                    },
                  ],
                },
                {
                  field_id: 1480641,
                  field_name: 'Email',
                  field_code: 'EMAIL',
                  field_type: 'multitext',
                  values: [
                    {
                      value: client.email,
                      enum_id: 1668741,
                      enum_code: 'WORK',
                    },
                  ],
                },
              ],
            },
          ],
          {
            headers: { Authorization: `Bearer ${this.tokens.accessToken}` },
          }
        )
        .pipe(
          map((res) => {
            return res.data;
          }),
          catchError((err) => {
            throw new Error(err.message);
          })
        )
    );

    return posted;
  }

  async patchClient(client: ClientDto, id: number) {
    const updated = await firstValueFrom(
      this.http
        .patch(
          `${this.apiUrl}`,
          [
            {
              id: id,
              name: client.name,
              custom_fields_values: [
                {
                  field_id: 1480639,
                  field_name: 'Телефон',
                  field_code: 'PHONE',
                  field_type: 'multitext',
                  values: [
                    {
                      value: client.phone,
                      enum_id: 1668729,
                      enum_code: 'WORK',
                    },
                  ],
                },
                {
                  field_id: 1480641,
                  field_name: 'Email',
                  field_code: 'EMAIL',
                  field_type: 'multitext',
                  values: [
                    {
                      value: client.email,
                      enum_id: 1668741,
                      enum_code: 'WORK',
                    },
                  ],
                },
              ],
            },
          ],
          {
            headers: { Authorization: `Bearer ${this.tokens.accessToken}` },
          }
        )
        .pipe(
          map((res) => {
            return res.data;
          }),
          catchError((err) => {
            throw new Error(err.message);
          })
        )
    );

    return updated;
  }
}
