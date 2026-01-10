import { ServerResponse, ValidateErrorSubType } from '@/interfaces/response-typing';
import { GetServerError } from '@/interfaces/responses/shared';

type DemoEndpointResult = {
    message: string;
};

const enum DemoEndpointErrorCodes {
    GENERIC_ERROR = 'GENERIC_ERROR',
    OTHER_ERROR = 'OTHER_ERROR',
}

type DemoEndpointErrorType = ValidateErrorSubType<
    GetServerError<
        | {
              errorCode: DemoEndpointErrorCodes.GENERIC_ERROR;
              details: {
                  info: string;
              };
          }
        | {
              errorCode: DemoEndpointErrorCodes.OTHER_ERROR;
          }
    >
>;

export type DemoEndpointResponse = ServerResponse<DemoEndpointResult, DemoEndpointErrorType>;
