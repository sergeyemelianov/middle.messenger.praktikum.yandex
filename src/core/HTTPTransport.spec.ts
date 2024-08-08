import sinon, { SinonFakeXMLHttpRequest } from 'sinon';
import HTTPTransport, { METHODS } from './HTTPTransport';
import { expect } from 'chai';

describe('HTTPTransport Test', () => {
  const fakeReq: SinonFakeXMLHttpRequest[] = [];
  let http: HTTPTransport;

  before(() => {
    sinon.useFakeXMLHttpRequest().onCreate = (req: SinonFakeXMLHttpRequest) => {
      fakeReq.push(req);
    };
    http = new HTTPTransport();
  });

  afterEach(() => {
    fakeReq.length = 0;
  });

  it('GET Method test', () => {
    http.get('/');
    expect(fakeReq[0].method).to.be.eq(METHODS.GET);
  });

  it('POST Method test', () => {
    http.post('/');
    expect(fakeReq[0].method).to.be.eq(METHODS.POST);
  });

  it('.DELETE Method test', () => {
    http.delete('/');
    expect(fakeReq[0].method).to.be.eq(METHODS.DELETE);
  });

  it('PUT Method test', () => {
    http.put('/');
    expect(fakeReq[0].method).to.be.eq(METHODS.PUT);
  });
});
