import { IInstantiationService } from '@hoodwink/common/instantiation/instantiation';
import { ServiceCollection } from '@hoodwink/common/instantiation/serviceCollection';
import { InstantiationService } from '@hoodwink/common/instantiation/instantiationService';
import { ILogService } from '@hoodwink/module/log/ILogService';
import { SyncDescriptor } from '@hoodwink/common/instantiation/descriptors';
import { ConsoleLogService } from '@hoodwink/module/log/consoleLogService';

export class Main {
  async startup() {
    const instantiationService = this.createInstance();

    await instantiationService.invokeFunction(async (accessor) => {});
  }

  createInstance(): IInstantiationService {
    const services = new ServiceCollection();
    services.set(ILogService, new SyncDescriptor(ConsoleLogService));

    return new InstantiationService(services, true);
  }
}
