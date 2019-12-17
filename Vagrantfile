# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/bionic64"
  config.vm.synced_folder ".", "/vagrant", id: "vagrant-root", nfs: true, mount_options: ['actimeo=1']
  config.vm.provision :shell, path: "provision/development/bootstrap.sh"
  
  config.vm.hostname = "base.app.react.vm"
  config.vm.network :private_network, ip: "172.29.17.204"
  config.vm.network "forwarded_port", guest: 8081, host: 8081
  config.vm.network "forwarded_port", guest: 8097, host: 8097
  
  config.vm.provider "virtualbox" do |vb|
    vb.name = "BASE-APP-REACT-VM"
    vb.memory = 2048
  end

end
