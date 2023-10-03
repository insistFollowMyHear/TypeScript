## fatal: unable to access 'https://github.com/insistFollowMyHear/TypeScript-learning.git/': OpenSSL SSL_read: Connection was reset, errno 10054
```
// 解决方案
git config --global http.sslVerify "false"
```