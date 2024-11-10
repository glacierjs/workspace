import { HttpResponse } from './HttpResponse';
import { createServiceResponseMock } from '../../test/mocks/createServiceResponseMock';
import { HttpStatusCode } from '../interfaces/HttpStatusCode';

describe('HttpResponse', () => {
  describe('build', () => {
    it('should create a new HttpResponse instance', () => {
      const instance = HttpResponse.build();
      expect(instance).toBeInstanceOf(HttpResponse);
    });
  });

  describe('applyResponse', () => {
    it('should apply all headers to response object', () => {
      const instance = HttpResponse.build().setHeader('a', 'b');
      const serverResponse = createServiceResponseMock();
      instance.applyResponse(serverResponse);
      expect(serverResponse.setHeader).toHaveBeenCalledWith('a', ['b']);
    });

    it('should apply the statusCode', () => {
      const instance = HttpResponse.build().setHeader('a', 'b');
      const serverResponse = createServiceResponseMock();
      instance.applyResponse(serverResponse);
      expect(serverResponse.statusCode).toEqual(200);
    });

    it('should write the body', () => {
      const buffer = Buffer.from('X');
      const instance = HttpResponse.build().setBody(buffer);
      const serverResponse = createServiceResponseMock();
      instance.applyResponse(serverResponse);
      expect(serverResponse.write).toHaveBeenCalledWith(buffer);
    });

    it('should end the response', () => {
      const instance = HttpResponse.build();
      const serverResponse = createServiceResponseMock();
      instance.applyResponse(serverResponse);
      expect(serverResponse.end).toHaveBeenCalledWith();
    });
  });

  describe('setStatus', () => {
    it('should set the status', () => {
      const instance = HttpResponse.build();
      expect(instance.getStatus()).toBe(HttpStatusCode.OK);
      instance.setStatus(HttpStatusCode.NOT_IMPLEMENTED);
      expect(instance.getStatus()).toBe(HttpStatusCode.NOT_IMPLEMENTED);
    });
  });

  describe('getStatus', () => {
    it('should return the status', () => {
      const instance = HttpResponse.build();
      expect(instance.getStatus()).toBe(HttpStatusCode.OK);
    });
  });

  describe('setBody', () => {
    it('should set the body', () => {
      const instance = HttpResponse.build();
      const body = Buffer.from('X');
      expect(instance.getBody()).toBeUndefined();
      instance.setBody(body);
      expect(instance.getBody()).toBe(body);
    });
  });

  describe('getBody', () => {
    it('should return the current body', () => {
      const instance = HttpResponse.build();
      const body = Buffer.from('X');
      expect(instance.getBody()).toBeUndefined();
      instance.setBody(body);
      expect(instance.getBody()).toBe(body);
    });
  });

  describe('deleteBody', () => {
    it('should remove the current body', () => {
      const instance = HttpResponse.build();
      const body = Buffer.from('X');
      expect(instance.getBody()).toBeUndefined();
      instance.setBody(body);
      expect(instance.getBody()).toBe(body);
      instance.deleteBody();
      expect(instance.getBody()).toBeUndefined();
    });
  });
});
