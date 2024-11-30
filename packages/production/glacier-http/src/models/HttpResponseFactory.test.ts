import { HttpResponseFactory } from './HttpResponseFactory';
import { HttpStatusCode } from '../interfaces/HttpStatusCode';

describe('HttpResponseFactory', () => {
  describe('build', () => {
    it('should create a new HttpResponse instance', () => {
      const instance = HttpResponseFactory.build();
      expect(instance).toBeInstanceOf(HttpResponseFactory);
    });
  });

  describe('setStatus', () => {
    it('should set the status', () => {
      const instance = HttpResponseFactory.build();
      expect(instance.getStatus()).toBe(HttpStatusCode.OK);
      instance.setStatus(HttpStatusCode.NOT_IMPLEMENTED);
      expect(instance.getStatus()).toBe(HttpStatusCode.NOT_IMPLEMENTED);
    });
  });

  describe('getStatus', () => {
    it('should return the status', () => {
      const instance = HttpResponseFactory.build();
      expect(instance.getStatus()).toBe(HttpStatusCode.OK);
    });
  });

  describe('setBody', () => {
    it('should set the body', () => {
      const instance = HttpResponseFactory.build();
      const body = Buffer.from('X');
      expect(instance.getBody()).toBeUndefined();
      instance.setBody(body);
      expect(instance.getBody()).toBe(body);
    });
  });

  describe('getBody', () => {
    it('should return the current body', () => {
      const instance = HttpResponseFactory.build();
      const body = Buffer.from('X');
      expect(instance.getBody()).toBeUndefined();
      instance.setBody(body);
      expect(instance.getBody()).toBe(body);
    });
  });

  describe('deleteBody', () => {
    it('should remove the current body', () => {
      const instance = HttpResponseFactory.build();
      const body = Buffer.from('X');
      expect(instance.getBody()).toBeUndefined();
      instance.setBody(body);
      expect(instance.getBody()).toBe(body);
      instance.deleteBody();
      expect(instance.getBody()).toBeUndefined();
    });
  });
});
